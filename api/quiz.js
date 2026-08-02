const QUIZ_API_BASE_URL = 'https://quizapi.io/api/v1/questions';

function getSingleQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function buildQuizApiUrl(quizId) {
  const url = new URL(QUIZ_API_BASE_URL);
  url.search = new URLSearchParams({
    quiz_id: quizId,
    include_answers: 'true',
  }).toString();
  return url;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      error: 'Method not allowed. Use GET for /api/quiz.',
    });
  }

  const apiKey = process.env.QUIZ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Server configuration error: missing QUIZ_API_KEY.',
    });
  }

  const quizId = getSingleQueryValue(req.query?.quiz_id);
  if (typeof quizId !== 'string' || quizId.trim() === '') {
    return res.status(400).json({
      error: 'Missing required query parameter: quiz_id.',
    });
  }

  const upstreamUrl = buildQuizApiUrl(quizId.trim());

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const contentType = upstreamResponse.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');

    if (!isJson) {
      return res.status(502).json({
        error: 'QuizAPI returned a non-JSON response.',
      });
    }

    const payload = await upstreamResponse.json();

    if (!upstreamResponse.ok) {
      return res.status(upstreamResponse.status).json({
        error: 'QuizAPI request failed.',
        status: upstreamResponse.status,
        details: payload,
      });
    }
    
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(502).json({
      error: 'Failed to reach QuizAPI from the backend proxy.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
