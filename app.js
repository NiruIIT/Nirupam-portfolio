import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Code, ExternalLink, User, Briefcase, Sparkles, X, Lightbulb, GraduationCap, Building, Award, Terminal, Monitor, Server, Database, Wrench, Brain, Download } from 'lucide-react';

// Actual Data from Nirupam Mondal's PDF
const mockUserData = {
  name: 'Nirupam Mondal',
  tagline: 'Quantitative Researcher, AI/ML Engineer & Full Stack Developer',
  bio: 'An aspiring Mechanical Engineer from IIT (ISM) Dhanbad with a keen interest in Algorithmic Trading, Quantitative Research, and High-Frequency Trading. Passionate about building robust predictive models, optimizing financial strategies, and leveraging deep learning for impactful solutions. Experienced in full-stack development and committed to continuous learning.',
  profilePic: 'https://placehold.co/150x150/000000/FFFFFF?text=NM', // Placeholder image, replace with actual profile pic if available
  social: {
    github: 'https://github.com/nirupammondal-iit',
    linkedin: 'https://www.linkedin.com/in/nirupammondal-iit',
    email: 'mailto:iitniru@gmail.com',
  },
  resumeUrl: 'NirupamMondal_IIT_Finance.pdf', // Direct link to the uploaded PDF
  skills: {
    'Programming Languages': ['C', 'C++', 'Python (Pandas, Numpy, Tensorflow)', 'HTML', 'MATLAB', 'SQL'],
    'Concepts': ['Artificial Intelligence', 'Tensorflow', 'Quantitative analytics', 'Regression analysis', 'Time series analysis', 'Data analysis', 'Statistics'],
    'Software': ['MATLAB', 'Simulink', 'SolidWorks', 'ASPEN ONE', 'Autocad 2D'],
    'Frontend': [],
    'Backend': [],
    'Databases': ['SQL'],
    'Tools & Platforms': ['Tensorflow'],
    'AI/ML': ['Artificial Intelligence', 'TensorFlow', 'Time series analysis', 'Regression analysis'],
  },
  experience: [
    {
      id: 1,
      title: 'Quantitative Research Consultant',
      company: 'WorldQuant Brain',
      years: 'Mar 2023 - Dec 2024 (Freelance)',
      description: [
        'Modelled and implemented alphas, predictive models, and quantitative trading strategies.',
        'Engineered and optimized alpha models, leveraging financial datasets, improving market inefficiency detection by 20%.',
      ],
    },
    {
      id: 2,
      title: 'Hostel Maintenance Secretary',
      company: 'IIT (ISM) Dhanbad (Extracurricular)',
      years: '2023-2025',
      description: [
        'Managed a team of 10+ members, overseeing infrastructure maintenance and optimizing hostel operations.',
      ],
    },
  ],
  education: [
    {
      id: 1,
      degree: 'Bachelor of Technology (6th Semester, Ongoing)',
      institution: 'Indian Institute of Technology (Indian School of Mines), Dhanbad',
      years: 'Ongoing',
      details: 'Mechanical Engineering (Adm No. 22JE0631), CGPA: 8.55',
    },
    {
      id: 2,
      degree: 'CBSE (Class XII)',
      institution: 'Hariyana Vidya Mandir',
      years: 'July, 2021',
      details: 'Percentage: 92.8%',
    },
    {
      id: 3,
      degree: 'CBSE (Class X)',
      institution: 'Hariyana Vidya Mandir',
      years: 'May, 2019',
      details: 'Percentage: 96%',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'Ranked in the top 1.0 percent in IIT-JEE Advanced.',
      issuer: 'IIT-JEE Advanced',
      date: '2022',
      details: 'National level engineering entrance examination.',
    },
    {
      id: 2,
      title: 'Secured 948 rank in WBJEE among 90000+ candidates.',
      issuer: 'West Bengal Joint Entrance Examinations (WBJEE)',
      date: '2022',
      details: 'State-level engineering entrance examination.',
    },
    {
      id: 3,
      title: 'Positioned in the national top 0.2% (1.4 million) in JEE Mains.',
      issuer: 'JEE Mains',
      date: '2022',
      details: 'National level engineering entrance examination.',
    },
    {
      id: 4,
      title: 'Secured 1st position twice in IMO at state level by SOF.',
      issuer: 'International Mathematics Olympiad (IMO) by SOF',
      date: '2016, 2017',
      details: 'Recognized for excellence in mathematics at the state level.',
    },
  ],
};

const mockProjects = [
  {
    id: 1,
    name: 'Algorithmic Trading Strategy for ETHEREUM',
    description: 'Designed and backtested an algorithmic trading strategy for ETHUSDT using Heikin-Ashi, ADX, RSI, MACD, and ATR-based trailing SL/TP on 30-minute OHLCV data over 4 years (2020 to 2023). Implemented BTC correlation filtering of 0.83 to enhance signal reliability and align ETH entries with broader market trends. Achieved a sharpe ratio of 9.76 with maximum drawdown of only 6.9% and annualized return of 44.3% with a capital of $1000 on each trade.',
    technologies: ['Algorithmic Trading', 'Heikin-Ashi', 'ADX', 'RSI', 'MACD', 'ATR', 'Backtesting'],
    githubUrl: 'https://github.com/yourusername/ethereum-algo-trading-strategy', // Placeholder
    liveUrl: '#',
  },
  {
    id: 2,
    name: 'Nifty50 Price Prediction',
    description: 'Modelled a deep learning model leveraging Long Short-Term Memory (LSTM) networks to predict Nifty50 stock prices based on historical 5-minute interval data. Achieved a mean absolute percentage error (MAPE) of 2.8% and an R2 score of 0.91, improving short-term trend analysis and decision-making. Optimized model training with 50 epochs and a batch size of 64, reducing loss by 35% compared to the baseline model.',
    technologies: ['Supervised Machine Learning', 'LSTM', 'API', 'Deep Learning', 'TensorFlow'],
    githubUrl: 'https://github.com/yourusername/nifty50-prediction', // Placeholder
    liveUrl: '#',
  },
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const heroCanvasRef = useRef(null); // Ref for the Three.js canvas

  // Three.js setup and animation for the "web-like" effect
  useEffect(() => {
    if (!heroCanvasRef.current || typeof window.THREE === 'undefined') {
      console.warn('THREE.js not loaded or canvas ref not available.');
      return;
    }

    const THREE = window.THREE;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvasRef.current, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles setup
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = [];
    const particleColors = []; // For individual particle colors

    // Vibrant colors for particles
    const colors = [
      new THREE.Color(0x00e676), // Vibrant Green
      new THREE.Color(0x3f51b5), // Vibrant Indigo
      new THREE.Color(0xff4081), // Vibrant Pink
      new THREE.Color(0x00bcd4), // Vibrant Cyan
      new THREE.Color(0xffea00)  // Vibrant Yellow
    ];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 60; // Spread over a larger area
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      positions.push(x, y, z);

      const color = colors[Math.floor(Math.random() * colors.length)];
      particleColors.push(color.r, color.g, color.b);
    }

    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2, // Smaller particles
      vertexColors: true, // Use colors from attribute
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Lines setup - Changed to a deep, recognizable color
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1a1a2e, // A deep dark blue/purple color
      transparent: true,
      opacity: 0.5, // Increased opacity for better visibility
      linewidth: 1 // This might not have an effect on all platforms due to WebGL limitations
    });

    const maxLineDistance = 5; // Distance threshold for drawing lines
    const lineSegments = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(lineSegments);

    camera.position.z = 30; // Further back to see the web

    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX - windowHalfX) / windowHalfX;
      mouse.y = (event.clientY - windowHalfY) / windowHalfY;
    }, false);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Move camera subtly with mouse
      target.x = mouse.x * 0.5;
      target.y = mouse.y * 0.5;

      camera.position.x += (target.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (target.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position); // Always look at the center

      // Animate particles (subtle random movement)
      const positionsArray = particles.attributes.position.array;
      for (let i = 0; i < positionsArray.length; i += 3) {
        positionsArray[i] += Math.sin(Date.now() * 0.0001 + i) * 0.01;
        positionsArray[i + 1] += Math.cos(Date.now() * 0.0001 + i) * 0.01;
      }
      particles.attributes.position.needsUpdate = true; // Tell Three.js to update vertex positions

      // Update lines based on particle proximity
      const linePositions = [];
      // No need for lineColors when fixed color is used for lineMaterial
      // const lineColors = [];

      for (let i = 0; i < particleCount; i++) {
        const p1 = new THREE.Vector3(positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2]);
        // const c1 = new THREE.Color().fromArray(particleColors, i * 3); // Not needed for fixed line color

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = new THREE.Vector3(positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]);
          // const c2 = new THREE.Color().fromArray(particleColors, j * 3); // Not needed for fixed line color

          const distance = p1.distanceTo(p2);

          if (distance < maxLineDistance) {
            linePositions.push(p1.x, p1.y, p1.z);
            linePositions.push(p2.x, p2.y, p2.z);

            // No interpolation needed, use fixed color
            // const mixedColor = c1.clone().lerp(c2, distance / maxLineDistance);
            // lineColors.push(mixedColor.r, mixedColor.g, mixedColor.b);
            // lineColors.push(mixedColor.r, mixedColor.g, mixedColor.b);
          }
        }
      }

      lineSegments.geometry.dispose(); // Dispose old geometry
      lineSegments.geometry = new THREE.BufferGeometry();
      lineSegments.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      // No need to set color attribute for lines when fixed color is used
      // lineSegments.geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
      particleSystem.geometry.dispose();
      particleSystem.material.dispose();
      lineSegments.geometry.dispose();
      lineSegments.material.dispose();
    };
  }, []);

  // Function to call Gemini API and generate enhanced description
  const generateProjectDescription = async (projectName, projectDescription) => {
    setIsLoading(true);
    setGeneratedDescription('');
    setModalTitle(`Enhanced Description for: ${projectName}`);
    setShowModal(true);

    const prompt = `Expand and refine the following project description for a professional portfolio website, making it more detailed and highlighting its impact. Focus on the technologies used and the value provided. Keep the response concise and professional, ideally under 150 words.

    Project Name: ${projectName}
    Original Description: ${projectDescription}`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedDescription(text);
      } else {
        setGeneratedDescription('Failed to generate description. Please try again.');
        console.error('Gemini API response structure unexpected:', result);
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setGeneratedDescription('An error occurred while generating the description.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get the appropriate icon for each skill category
  const getSkillCategoryIcon = (category) => {
    switch (category) {
      case 'Programming Languages':
        return <Terminal className="mr-2" size={24} />;
      case 'Frontend':
        return <Monitor className="mr-2" size={24} />;
      case 'Backend':
        return <Server className="mr-2" size={24} />;
      case 'Databases':
        return <Database className="mr-2" size={24} />;
      case 'Tools & Platforms':
        return <Wrench className="mr-2" size={24} />;
      case 'AI/ML':
        return <Brain className="mr-2" size={24} />;
      case 'Concepts':
        return <Lightbulb className="mr-2" size={24} />;
      case 'Software':
        return <Code className="mr-2" size={24} />;
      default:
        return <Code className="mr-2" size={24} />; // Fallback icon
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter antialiased">
      {/* Navigation */}
      <nav className="fixed w-full z-20 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
          <a href="#" className="text-2xl font-bold text-teal-400">Nirupam Mondal</a>
          <div className="space-x-6 hidden md:flex">
            <a href="#about" className="text-gray-300 hover:text-teal-400 transition duration-300">About</a>
            <a href="#skills" className="text-gray-300 hover:text-teal-400 transition duration-300">Skills</a>
            <a href="#experience" className="text-gray-300 hover:text-teal-400 transition duration-300">Experience</a>
            <a href="#education" className="text-gray-300 hover:text-teal-400 transition duration-300">Education</a>
            <a href="#achievements" className="text-gray-300 hover:text-teal-400 transition duration-300">Achievements</a>
            <a href="#resume" className="text-gray-300 hover:text-teal-400 transition duration-300">Resume</a>
            <a href="#projects" className="text-gray-300 hover:text-teal-400 transition duration-300">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-teal-400 transition duration-300">Contact</a>
          </div>
          {/* Mobile menu - can be expanded with state for toggle */}
          <div className="md:hidden">
            <Code className="text-gray-300" size={24} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center p-4 overflow-hidden" id="hero">
        {/* Three.js Canvas for dynamic background */}
        <canvas ref={heroCanvasRef} className="absolute inset-0 z-0"></canvas>
        {/* Background gradient/shape for "awesome graphics" - adjusted for vibrancy */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-900 to-pink-700 opacity-70"></div>
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto p-6 bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl backdrop-blur-md border border-gray-700">
          <img
            src={mockUserData.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-teal-400 shadow-lg transition transform hover:scale-105 duration-300"
          />
          <h1 className="text-5xl font-extrabold text-teal-400 mb-4 animate-fade-in-up">
            Hi, I'm {mockUserData.name}!
          </h1>
          <p className="text-2xl text-gray-200 mb-8 animate-fade-in delay-200">
            {mockUserData.tagline}
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href={mockUserData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-110 shadow-md"
              aria-label="GitHub"
            >
              <Github className="text-gray-200" size={32} />
            </a>
            <a
              href={mockUserData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-110 shadow-md"
              aria-label="LinkedIn"
            >
              <Linkedin className="text-gray-200" size={32} />
            </a>
            <a
              href={mockUserData.social.email}
              className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-110 shadow-md"
              aria-label="Email"
            >
              <Mail className="text-gray-200" size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800 p-4 md:p-8">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-teal-400 mb-10 flex items-center justify-center">
            <User className="mr-3" size={36} /> About Me
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed bg-gray-700 bg-opacity-50 p-8 rounded-lg shadow-xl border border-gray-600 animate-fade-in-up">
            {mockUserData.bio}
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900 p-4 md:p-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-teal-400 mb-12 text-center flex items-center justify-center">
            <Lightbulb className="mr-3" size={36} /> My Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(mockUserData.skills).map(([category, skillList]) => (
              <div key={category} className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 hover:border-teal-500 transition duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                  {getSkillCategoryIcon(category)} {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <span key={index} className="bg-teal-600 bg-opacity-20 text-teal-300 text-sm px-4 py-2 rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-800 p-4 md:p-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-teal-400 mb-12 text-center flex items-center justify-center">
            <Building className="mr-3" size={36} /> Experience
          </h2>
          <div className="space-y-12">
            {mockUserData.experience.map((job) => (
              <div key={job.id} className="bg-gray-700 bg-opacity-50 rounded-xl shadow-xl p-8 border border-gray-600 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-100">{job.title}</h3>
                  <span className="text-gray-400 text-lg">{job.years}</span>
                </div>
                <p className="text-xl text-teal-300 mb-4">{job.company}</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {job.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-900 p-4 md:p-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-teal-400 mb-12 text-center flex items-center justify-center">
            <GraduationCap className="mr-3" size={36} /> Education
          </h2>
          <div className="space-y-8">
            {mockUserData.education.map((edu) => (
              <div key={edu.id} className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 hover:border-teal-500 transition duration-300 transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-gray-100 mb-1">{edu.degree}</h3>
                <p className="text-xl text-teal-300 mb-1">{edu.institution}</p>
                <p className="text-gray-400 text-lg mb-2">{edu.years}</p>
                <p className="text-gray-300 leading-relaxed">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-gray-800 p-4 md:p-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-teal-400 mb-12 text-center flex items-center justify-center">
            <Award className="mr-3" size={36} /> Achievements
          </h2>
          <div className="space-y-8">
            {mockUserData.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-gray-700 bg-opacity-50 rounded-xl shadow-xl p-6 border border-gray-600 animate-fade-in-up">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-100">{achievement.title}</h3>
                  <span className="text-gray-400 text-lg">{achievement.date}</span>
                </div>
                <p className="text-xl text-teal-300 mb-2">{achievement.issuer}</p>
                <p className="text-gray-300 leading-relaxed">{achievement.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 bg-gray-900 p-4 md:p-8">
        <div className="container mx-auto text-center max-w-xl">
          <h2 className="text-4xl font-bold text-teal-400 mb-10 flex items-center justify-center">
            <Download className="mr-3" size={36} /> My Resume
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            A comprehensive overview of my professional journey, skills, and accomplishments.
          </p>
          <a
            href={mockUserData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-700 transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto w-fit"
          >
            <Download className="mr-3" size={24} /> Download Resume
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900 p-4 md:p-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-teal-400 mb-12 text-center flex items-center justify-center">
            <Briefcase className="mr-3" size={36} /> My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 hover:border-teal-500 transition duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-100 mb-3">{project.name}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-teal-600 bg-opacity-20 text-teal-300 text-sm px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-teal-400 transition duration-300 text-lg group"
                    >
                      <Github className="mr-2 group-hover:scale-110 transition duration-300" size={20} />
                      GitHub
                    </a>
                    {project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-teal-400 transition duration-300 text-lg group"
                      >
                        <ExternalLink className="mr-2 group-hover:scale-110 transition duration-300" size={20} />
                        Live Demo
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => generateProjectDescription(project.name, project.description)}
                    className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-md"
                  >
                    Enhance Description ✨
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800 p-4 md:p-8">
        <div className="container mx-auto text-center max-w-xl">
          <h2 className="text-4xl font-bold text-teal-400 mb-10 flex items-center justify-center">
            <Mail className="mr-3" size={36} /> Get in Touch
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <a
            href={mockUserData.social.email}
            className="inline-block bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Send Me an Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-6 text-center text-sm">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} {mockUserData.name}. All rights reserved.</p>
          <p className="mt-2">Built with React & Tailwind CSS</p>
        </div>
      </footer>

      {/* Description Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-8 max-w-lg w-full shadow-2xl border border-teal-500 relative animate-scale-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition duration-300"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-teal-400 mb-6 text-center">{modalTitle}</h3>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
                <p className="ml-4 text-gray-300">Generating...</p>
              </div>
            ) : (
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{generatedDescription}</p>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-8 block mx-auto bg-teal-600 text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-teal-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Global styles for animations and Inter font */}
      <style>{`
        @import url('https://rsms.me/inter/inter.css');
        html { font-family: 'Inter', sans-serif; }

        @supports (font-variation-settings: normal) {
          html { font-family: 'Inter var', sans-serif; }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
          transform: scale(0.9);
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Three.js global script injection */
        /* This is a workaround for dynamic imports not being supported in this environment. */
        /* In a real React project with a build system, you would typically npm install three and import it directly. */
        @layer base {
          body {
            position: relative; /* Needed for absolute positioning of canvas */
            overflow-x: hidden; /* Prevent horizontal scroll from 3D elements sometimes */
          }
        }
      `}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    </div>
  );
}

export default App;
