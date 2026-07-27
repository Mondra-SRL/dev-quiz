import htmlLogo from '../assets/topic-html-retro-logo.png';
import cssLogo from '../assets/topic-css-retro-logo.png';
import jsLogo from '../assets/topic-javascript-retro-logo.png';
import tsLogo from '../assets/topic-typescript-retro-logo.png';
import reactLogo from '../assets/topic-react-retro-logo.png';
import pythonLogo from '../assets/topic-python-retro-logo.png';

const quizTopics = [
  {
    id: 'HTML',
    name: 'HTML',
    image: htmlLogo,
    description: 'the standard markup language for structuring web page content using elements and tags.',
    apiTags: 'html',
    apiQuizId: 'cms3a30pt0lesfbut0jx2p576',
  },
  {
    id: 'CSS',
    name: 'CSS',
    image: cssLogo,
    description: 'a style sheet language used for describing the presentation of HTML documents.',
    apiCategory: 'css',
  },
  {
    id: 'JavaScript',
    name: 'JavaScript',
    image: jsLogo,
    description: 'a lightweight, interpreted programming language with first-class functions.',
    apiCategory: 'javascript',
  },
  {
    id: 'TypeScript',
    name: 'TypeScript',
    image: tsLogo,
    description: 'a strongly typed programming language that builds on JavaScript.',
    apiCategory: 'typescript',
  },
  {
    id: 'React',
    name: 'React',
    image: reactLogo,
    description: 'a JavaScript library for building user interfaces using components.',
    apiCategory: 'react',
  },
  {
    id: 'Python',
    name: 'Python',
    image: pythonLogo,
    description: 'a high-level, general-purpose programming language known for its readability.',
    apiCategory: 'python',
  },
];

export default quizTopics;
