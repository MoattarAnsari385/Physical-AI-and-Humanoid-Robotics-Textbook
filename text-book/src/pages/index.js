
import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import '../css/homepage.css';

// Footer links data - Only relative links
const footerLinks = {
  textbook: [
    { name: 'Introduction', url: '/docs/intro' },
    { name: 'Getting Started', url: '/docs/intro' },
    { name: 'Projects', url: '/docs/module-4-vla/capstone-scenario' }
  ],
  modules: [
    { name: 'Module 1: ROS 2', url: '/docs/module-1-ros2/intro' },
    { name: 'Module 2: Simulation', url: '/docs/module-2-simulation/intro' },
    { name: 'Module 3: AI-Robot Brain', url: '/docs/module-3-ai/intro' },
    { name: 'Module 4: VLA Systems', url: '/docs/module-4-vla/intro' }
  ],
  resources: [
    { name: 'Documentation', url: '/docs' },
    { name: 'Code Examples', url: '/examples' },
    { name: 'Tutorials', url: '/tutorials' }
  ]
};

const HomePage = () => {
  const {siteConfig} = useDocusaurusContext();
  const [isLightMode, setIsLightMode] = useState(false); // Default dark mode
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle light/dark mode
  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modules data
  const modules = [
    {
      title: "Module 1: Robotic Nervous System (ROS 2)",
      description: "Learn ROS 2 — the nervous system of modern robots. Build nodes, topics, services, actions, publishers, subscribers, QoS, and real robot workflows.",
      link: "/docs/module-1-ros2/intro"
    },
    {
      title: "Module 2: The Digital Twin (Gazebo & Simulation)",
      description: "Master simulation systems Gazebo, Unity Robotics, Isaac Sim, and digital twin workflows for training and testing robots safely.",
      link: "/docs/module-2-simulation/intro"
    },
    {
      title: "Module 3: The AI-Robot Brain (NVIDIA Isaac)",
      description: "Motors, actuators, torque control, IMUs, sensors, microcontrollers, embedded systems — everything real humanoids need.",
      link: "/docs/module-3-ai/intro"
    },
    {
      title: "Module 4: Vision-Language-Action (VLA)",
      description: "Learn the most advanced robotics architecture: perception models, LUA-driven command systems, action planners, and embodied AI agents.",
      link: "/docs/module-4-vla/intro"
    }
  ];

  // Define colors based on mode
  const colors = {
    background: isLightMode 
      ? 'linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f9fafb 100%)'
      : 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)',
    text: isLightMode ? '#1f2937' : '#ffffff',
    textSecondary: isLightMode ? '#4b5563' : '#d1d5db',
    textMuted: isLightMode ? '#6b7280' : '#9ca3af',
    border: isLightMode ? 'rgba(56, 201, 172, 0.3)' : 'rgba(56, 201, 172, 0.3)',
    cardBg: isLightMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.7)',
    sectionBg: isLightMode 
      ? 'linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f9fafb 100%)'
      : 'linear-gradient(135deg, #0f172a 0%, #000000 50%, #0f172a 100%)',
    footerBg: isLightMode 
      ? 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)'
      : 'linear-gradient(135deg, #030712 0%, #111827 100%)',
    buttonBorder: isLightMode ? 'rgba(56, 201, 172, 0.3)' : 'rgba(56, 201, 172, 0.3)',
    buttonHoverBg: isLightMode ? 'rgba(56, 201, 172, 0.1)' : 'rgba(56, 201, 172, 0.2)'
  };

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Textbook - University-level educational content for modern robotics"
      wrapperClassName="homepage-layout">
      <div style={{
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: colors.background,
        color: colors.text,
        transition: 'all 0.5s ease'
      }}>

        {/* Theme Toggle Button - Fixed position */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            borderRadius: '20%',
            background: isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            border: `1px solid ${colors.border}`,
            color: isLightMode ? '#1f2937' : 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '44px',
            height: '44px',
            outline: 'none',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #00b894 0%, #0055cc 100%)';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 5px 15px rgba(0, 184, 148, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = isLightMode ? '#1f2937' : 'white';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
          }}
          title={`Switch to ${isLightMode ? 'dark' : 'light'} mode`}
        >
          {isLightMode ? '🌙' : '☀️'}
        </button>

        {/* Main Content - Hero Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '85vh',
          padding: '3rem 1rem',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
            width: '100%',
            alignItems: 'center'
          }}>

            {/* Title Section */}
            <div style={{
              width: '100%',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #00b894 0%, #0055cc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
                lineHeight: '1.2',
                letterSpacing: '-0.5px'
              }}>
                Physical AI & Humanoid Robotics
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: '1.25rem',
                color: colors.textSecondary,
                marginBottom: '2rem',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                A practical guide to designing, programming, and deploying intelligent physical systems. Master ROS 2, simulation, embodied AI, and VLA systems through hands-on projects.
              </p>

              {/* Divider Line */}
              <div style={{
                width: '100%',
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
                margin: '2.5rem 0'
              }}></div>

              {/* Buttons */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '2rem'
              }}>
                <a
                  href="/docs/intro"
                  style={{
                    padding: '0.8rem 2rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #00b894 0%, #0055cc 100%)',
                    color: 'white',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 184, 148, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Start Reading
                </a>

                <a
                  href="/docs/module-4-vla/capstone-scenario"
                  style={{
                    padding: '0.8rem 2rem',
                    borderRadius: '8px',
                    border: `2px solid ${colors.buttonBorder}`,
                    color: colors.text,
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    background: colors.buttonHoverBg
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(56, 201, 172, 0.2)';
                    e.target.style.borderColor = '#00b894';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.buttonHoverBg;
                    e.target.style.borderColor = colors.buttonBorder;
                  }}
                >
                  View Projects
                </a>
              </div>
            </div>

            {/* Stats Section */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              flexWrap: 'wrap',
              marginTop: '3rem',
              width: '100%'
            }}>
              {[
                { number: '4', label: 'Core Modules' },
                { number: '28+', label: 'Chapters' },
                { number: '50+', label: 'Hands-on Projects' },
                { number: 'Future', label: 'Skills' }
              ].map((stat, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  minWidth: '120px'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #00b894 0%, #0055cc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: colors.textMuted,
                    marginTop: '0.5rem',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div style={{
          background: colors.sectionBg,
          padding: '6rem 1rem',
          marginTop: '4rem',
        }}>
          <div style={{
            maxWidth: '1600px',
            margin: '0 auto',
            width: '100%'
          }}>
            {/* Section Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #00b894 0%, #0055cc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '2rem',
                lineHeight: '1.2'
              }}>
                What This Textbook Covers
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: colors.textSecondary,
                maxWidth: '900px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                This is a complete AI-native engineering curriculum designed for physical AI, humanoid robots, embodied intelligence, ROS 2 programming, digital twin simulations, and Vision-Language-Action (VLA) systems. Each module builds your robotics superpowers step by step.
              </p>
            </div>

            {/* Modules Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {modules.map((module, index) => (
                <div 
                  key={index}
                  style={{
                    background: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    padding: '2rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 184, 148, 0.15)';
                    e.currentTarget.style.borderColor = '#00b894';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = colors.border;
                  }}
                >
                  {/* Gradient corner accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, transparent 50%, rgba(0, 184, 148, 0.1) 50%)',
                    borderBottomLeftRadius: '12px'
                  }}></div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: colors.text,
                    marginBottom: '1rem',
                    lineHeight: '1.3'
                  }}>
                    {module.title}
                  </h3>
                  
                  <p style={{
                    color: colors.textSecondary,
                    marginBottom: '1.5rem',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    {module.description}
                  </p>
                  
                  <a
                    href={module.link}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#00b894',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.gap = '0.7rem';
                      e.target.style.color = '#007db5';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.gap = '0.5rem';
                      e.target.style.color = '#00b894';
                    }}
                  >
                    Open Module →
                  </a>
                </div>


              ))}
            </div>

            {/* Explore All Modules Button */}
            <div style={{
              textAlign: 'center',
              marginTop: '3rem'
            }}>
              <a
                href="/docs"
                style={{
                  padding: '1rem 2.5rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #00b894 0%, #0055cc 100%)',
                  color: 'white',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.7rem',
                  fontSize: '1.1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 184, 148, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Explore All Modules
              </a>
            </div>
          </div>
        </div>

        {/* Simple Clean Footer */}
        <footer style={{
          background: colors.footerBg,
          padding: '4rem 1rem 2rem',
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%'
          }}>
            
            {/* Logo and Description */}
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #00b894 0%, #0055cc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem'
              }}>
                Physical AI & Humanoid Robotics
              </div>
              
              <p style={{
                color: colors.textMuted,
                fontSize: '1rem',
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                A practical guide to designing, programming, and deploying intelligent physical systems.
              </p>
            </div>

            {/* Links Grid - 3 columns with bottom borders */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              
              {/* Textbook Links - With bottom border */}
              <div>
                <div style={{
                  paddingBottom: '0.5rem',
                  marginBottom: '0.5rem',
                  borderBottom: '2px solid rgba(56, 201, 172, 0.5)',
                  width:'100px',
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: colors.text,
                    margin: 0
                  }}>
                    Textbook
                  </h4>
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {footerLinks.textbook.map((link, index) => (
                    <li key={index} style={{ marginBottom: '0.1rem' }}>
                      <a
                        href={link.url}
                        style={{
                          color: colors.textMuted,
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          fontSize: '0.95rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#00b894';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = colors.textMuted;
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules Links - With bottom border */}
              <div>
                <div style={{
                  paddingBottom: '0.5rem',
                  marginBottom: '0.5rem',
                  borderBottom: '2px solid rgba(56, 201, 172, 0.5)',
                  width:'95px',
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: colors.text,
                    margin: 0
                  }}>
                    Modules
                  </h4>
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {footerLinks.modules.map((link, index) => (
                    <li key={index} style={{ marginBottom: '0.1rem' }}>
                      <a
                        href={link.url}
                        style={{
                          color: colors.textMuted,
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          fontSize: '0.95rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#00b894';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = colors.textMuted;
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links - With bottom border */}
              <div>
                <div style={{
                  paddingBottom: '0.5rem',
                  marginBottom: '0.5rem',
                  borderBottom: '2px solid rgba(56, 201, 172, 0.5)',
                  width:'120px',
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: colors.text,
                    margin: 0
                  }}>
                    Resources
                  </h4>
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {footerLinks.resources.map((link, index) => (
                    <li key={index} style={{ marginBottom: '0.1rem' }}>
                      <a
                        href={link.url}
                        style={{
                          color: colors.textMuted,
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          fontSize: '0.95rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#00b894';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = colors.textMuted;
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            {/* Copyright Section */}
            <div style={{
              textAlign: 'center',
              color: colors.textMuted,
              fontSize: '0.9rem'
            }}>
              <p style={{ margin: 0 }}>
                © 2025 Physical AI & Humanoid Robotics Textbook by Moattar Ansari
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default function Home() {
  return <HomePage />;
}