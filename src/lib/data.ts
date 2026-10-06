export type Link = { title: string; href?: string };

export type Project = {
  slug: string;
  title: string;
  tags: string;
  color: string;
  description: string;
  when?: string;
  points?: string[];
  images: string[];
  links: Link[];
};

export const HOME_COLOR = '#007fff';

export const projects: Project[] = [
  {
    slug: 'pitstop',
    title: 'pitstop',
    tags: 'SQL, react, tsx',
    color: '#ff7be5',
    description: 'a customizable live dashboard for FTC robotics',
    when: 'June 2025 - Mar 2026',
    points: [
      'parses and pulls live event data from the FTC API into one dashboard a team can keep open in the pit',
      'compares team performance and breaks down rankings, match results, and OPR and DPR',
      'tracks how a team had performed across previous events',
      'at peak, had ~200 monthly users',
      'built with Next.js, React, and Tailwind, and live at ftcpitstop.com'
    ],
    images: ['/projects/pitstop-1.webp', '/projects/pitstop-2.png'],
    links: [
      { title: 'discord', href: 'https://discord.gg/9Rdbdr2NAt' },
      { title: 'github', href: 'https://github.com/nesetkab/ftc-pitstop' },
      { title: 'website', href: 'https://www.ftcpitstop.com/' }
    ]
  },
  {
    slug: 'medtner',
    title: 'medtner',
    tags: 'swift, appkit',
    color: '#007fff',
    description: 'a lightweight spotify player for macos with a menu bar controller. it plays audio itself, so the spotify app never has to open',
    when: 'Sep 2026 – present',
    points: [
      'plays Spotify through a bundled librespot engine and AVAudioEngine',
      'search, queue, playlists, liked songs, and a native menu bar controller',
      'gradient animations react live to the bass, mids, and highs of the song',
      'idles at 0% CPU vs Spotify\'s 20% by running every continuous animation on Core Animation'
    ],
    images: ['/projects/medtner-1.webp', '/projects/medtner-2.webp'],
    links: [{ title: 'github', href: 'https://github.com/nesetkab/medtner' }]
  },
  {
    slug: 'philidor',
    title: 'philidor',
    tags: 'python, ML',
    color: '#1fc86b',
    description: 'a chess bot that plays for draws rather than wins or losses',
    when: 'Aug 2026 – present',
    points: [
      'building a chess agent that plays for draws, selecting moves by highest draw probability from engine win-draw-loss evaluation',
      'wrote a threaded UCI engine wrapper with timeout handling, and a board subclass with incremental Zobrist hashing for fast repetition detection, covered by unit tests',
      'training a network on Lichess games with a reward function ranking draws above wins, as a research project'
    ],
    images: [],
    links: [{ title: 'github', href: 'https://github.com/nesetkab/philidor' }]
  },
  {
    slug: 'classbar',
    title: 'classbar',
    tags: 'objective c',
    color: '#8a5cff',
    description: 'a macos menu bar app for my classes and assignments',
    points: [
      'shows your current and next class in the macOS menu bar, with quick links',
      'pulls upcoming assignments from a Canvas calendar feed, and you can check them off as you go',
      'add your own tasks in plain words, like "essay fri 5pm", and the due date is read from what you type',
      'imports a class schedule from the .ics export of a school registration system',
      'extremely lightweight and fast'
    ],
    images: [],
    links: [{ title: 'github', href: 'https://github.com/nesetkab/classbar' }]
  },
  {
    slug: 'the-hive',
    title: 'the hive',
    tags: 'svelte',
    color: '#f8be14',
    description: 'the website for my robotics team',
    points: [
      'website for FTC team 3747, The Hive, from Beehive Science & Technology Academy in Sandy, Utah',
      'built with Svelte and Tailwind, live at hive3747.com'
    ],
    images: [],
    links: [
      { title: 'github', href: 'https://github.com/nesetkab/thehive' },
      { title: 'instagram', href: 'https://www.instagram.com/thehive3747/' },
      { title: 'website', href: 'https://hive3747.com' }
    ]
  },
  {
    slug: 'motor-asic',
    title: 'motor asic',
    tags: 'verilog, openlane, tiny tapeout',
    color: '#00b8b0',
    description: 'a closed-loop motor controller in Verilog, taped out on SkyWater 130 nm silicon',
    when: 'Aug 2026 – present',
    points: [
      'Designed a closed-loop motor controller in Verilog and taped it out on SkyWater 130 nm silicon through a multi-project wafer shuttle',
      'Implemented control arithmetic in fixed point, closing timing at 50 MHz after synthesis',
      'Verified with a self-checking testbench and gate-level simulation, then brought up the returned die on hardware'
    ],
    images: [],
    links: []
  },
  {
    slug: 'robotics programming',
    title: 'robotics programming',
    tags: 'java',
    color: '#ff8a4b',
    description: 'shoot-on-the-move and autonomous code for my team’s FTC robot',
    when: 'Sep 2025 – May 2026',
    points: [
      'derived a shoot-on-the-move solver that projects robot state forward across system latency, then binary searches time of flight to solve turret heading and flywheel RPM',
      'built an autonomous framework that allowed us to write new programs in seconds',
      'integrated Limelight AprilTag relocalization behind a staleness gate to correct odometry drift mid-match',
      'modeled turret torque and flywheel spin-up to size the shooter motor and gearing'
    ],
    images: [],
    links: []
  },
  {
    slug: 'artifact-tracker',
    title: 'artifact tracker',
    tags: 'python, opencv, raspberry pi',
    color: '#ff4d4d',
    description: 'a raspberry pi camera that counts game pieces by color',
    when: 'Aug 2025 – May 2026',
    points: [
      'built a Raspberry Pi vision system that counts game elements by HSV color thresholding and blob area, with debounce to reject duplicate detections',
      'wrote an interactive calibration tool that samples ball colors by click and writes thresholds, region of interest, and alliance to a configuration file',
      'removed venue-specific retuning from the code path, so lighting changes need no rebuild'
    ],
    images: [],
    links: [{ title: 'github', href: 'https://github.com/The-Hive-3747/Topaz25-26' }]
  }
];

export const links: Link[] = [
  { title: 'discord', href: 'https://discord.com/users/1009005900821954644' },
  { title: 'github', href: 'https://github.com/nesetkab' },
  { title: 'linkedin', href: 'https://www.linkedin.com/in/neset-kablan' },
  { title: 'resume', href: '/resume' }
];

export const palette = [HOME_COLOR, '#ff7be5', '#ff8a4b', '#ffc400', '#1fc86b', '#8a5cff', '#00b8b0', '#ff4d4d'];
