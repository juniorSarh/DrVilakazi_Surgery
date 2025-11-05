import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import styles from './Blog.module.css';

const Blog = () => {
  const { postId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'general-surgery', label: 'General Surgery' },
    { id: 'patient-education', label: 'Patient Education' },
    { id: 'health-tips', label: 'Health Tips' },
    { id: 'surgical-innovation', label: 'Surgical Innovation' }
  ];

  const blogPosts = [
    {
      id: 'minimally-invasive-benefits',
      title: 'The Benefits of Minimally Invasive Surgery',
      excerpt: 'Discover how minimally invasive surgical techniques are revolutionizing patient care with faster recovery times and less scarring.',
      content: `
        <h3>What is Minimally Invasive Surgery?</h3>
        <p>Minimally invasive surgery, also known as laparoscopic surgery, involves performing surgical procedures through small incisions using specialized instruments and cameras. This approach has transformed modern surgical practice.</p>

        <h3>Key Benefits</h3>
        <ul>
          <li>Smaller incisions and reduced scarring</li>
          <li>Less post-operative pain</li>
          <li>Shorter hospital stays</li>
          <li>Faster return to normal activities</li>
          <li>Reduced risk of infection</li>
          <li>Less blood loss during surgery</li>
        </ul>

        <h3>Common Procedures</h3>
        <p>Many surgical procedures can now be performed using minimally invasive techniques, including gallbladder removal, hernia repairs, appendectomies, and many gynecological procedures.</p>

        <h3>Is It Right for You?</h3>
        <p>While minimally invasive surgery offers many benefits, it's not suitable for every patient or every condition. Your surgeon will evaluate your specific case to determine the best approach for your needs.</p>
      `,
      category: 'general-surgery',
      author: 'Dr. Thando Vilakazi',
      date: '2024-01-15',
      readTime: '5 min read',
      icon: '🔬'
    },
    {
      id: 'surgery-preparation-guide',
      title: 'How to Prepare for Your Surgery: A Complete Guide',
      excerpt: 'Essential steps to take before your surgery to ensure the best possible outcome and smooth recovery process.',
      content: `
        <h3>Weeks Before Surgery</h3>
        <p>Proper preparation begins weeks before your scheduled procedure. This includes medical clearance, medication adjustments, and lifestyle changes that can improve your surgical outcome.</p>

        <h3>Medication Management</h3>
        <ul>
          <li>Review all medications with your surgical team</li>
          <li>Stop blood thinners as directed</li>
          <li>Adjust diabetes medications if needed</li>
          <li>Discuss supplements and herbal remedies</li>
        </ul>

        <h3>Pre-operative Testing</h3>
        <p>Your surgeon may order various tests including blood work, imaging studies, and cardiac evaluation to ensure you're ready for surgery.</p>

        <h3>The Day Before Surgery</h3>
        <p>Follow fasting instructions carefully, arrange for transportation, and prepare your home for recovery. Pack essentials for your hospital stay and make sure you have help arranged for the first few days at home.</p>
      `,
      category: 'patient-education',
      author: 'Dr. James Chen',
      date: '2024-01-10',
      readTime: '7 min read',
      icon: '📋'
    },
    {
      id: 'recovery-tips',
      title: 'Tips for a Smooth Surgical Recovery',
      excerpt: 'Expert advice on how to optimize your recovery after surgery and return to normal activities safely and quickly.',
      content: `
        <h3>Immediate Post-operative Period</h3>
        <p>The first few days after surgery are crucial for setting the foundation for a smooth recovery. Focus on rest, pain management, and following your surgeon's instructions carefully.</p>

        <h3>Pain Management Strategies</h3>
        <ul>
          <li>Take pain medications as prescribed</li>
          <li>Use ice packs as directed</li>
          <li>Position yourself comfortably</li>
          <li>Don't wait until pain is severe to medicate</li>
        </ul>

        <h3>Gradual Return to Activity</h3>
        <p>Follow your surgeon's timeline for increasing activity levels. Start with short walks and gradually increase duration and intensity as tolerated.</p>

        <h3>Nutrition and Hydration</h3>
        <p>Eat a balanced diet rich in protein and vitamins to support healing. Stay well-hydrated and avoid constipation with fiber and fluids.</p>
      `,
      category: 'health-tips',
      author: 'Dr. Sarah Moyo',
      date: '2024-01-05',
      readTime: '6 min read',
      icon: '💊'
    },
    {
      id: 'emergency-surgery-signs',
      title: 'When to Seek Emergency Surgical Care',
      excerpt: 'Recognizing the signs and symptoms that require immediate surgical intervention can be life-saving.',
      content: `
        <h3>Abdominal Emergencies</h3>
        <p>Sudden, severe abdominal pain may indicate surgical emergencies such as appendicitis, bowel obstruction, or perforated ulcer. Seek immediate care if you experience:</p>
        <ul>
          <li>Sudden, severe abdominal pain</li>
          <li>Abdominal rigidity</li>
          <li>Fever with abdominal pain</li>
          <li>Inability to pass gas or stool</li>
          <li>Vomiting blood or coffee grounds</li>
        </ul>

        <h3>Trauma and Injury</h3>
        <p>Significant injuries may require emergency surgical intervention. Don't wait to seek care for penetrating injuries, severe burns, or major fractures.</p>

        <h3>When in Doubt, Seek Care</h3>
        <p>If you're experiencing symptoms that concern you, it's always better to seek medical evaluation rather than wait. Early intervention often leads to better outcomes.</p>
      `,
      category: 'general-surgery',
      author: 'Dr. Thando Vilakazi',
      date: '2023-12-28',
      readTime: '5 min read',
      icon: '🚑'
    },
    {
      id: 'hernia-surgery-options',
      title: 'Understanding Hernia Surgery Options',
      excerpt: 'A comprehensive overview of different hernia types and the surgical approaches used to treat them.',
      content: `
        <h3>Types of Hernias</h3>
        <p>Hernias occur when tissue protrudes through a weak spot in the abdominal wall. Common types include inguinal, umbilical, incisional, and hiatal hernias.</p>

        <h3>Surgical Repair Options</h3>
        <ul>
          <li>Open repair with mesh reinforcement</li>
          <li>Laparoscopic (minimally invasive) repair</li>
          <li>Robotic-assisted repair</li>
        </ul>

        <h3>Recovery Expectations</h3>
        <p>Recovery time varies depending on the surgical approach and hernia type. Most patients return to light activities within 1-2 weeks and normal activities within 4-6 weeks.</p>

        <h3>Choosing the Right Approach</h3>
        <p>Your surgeon will recommend the best approach based on your hernia type, size, location, and overall health.</p>
      `,
      category: 'patient-education',
      author: 'Dr. James Chen',
      date: '2023-12-20',
      readTime: '6 min read',
      icon: '🏥'
    },
    {
      id: 'surgical-innovation-future',
      title: 'The Future of Surgery: Innovation and Technology',
      excerpt: 'Exploring cutting-edge technologies that are shaping the future of surgical care and patient outcomes.',
      content: `
        <h3>Robotic Surgery</h3>
        <p>Robotic systems like the da Vinci surgical platform offer enhanced precision, 3D visualization, and improved dexterity for complex procedures.</p>

        <h3>Artificial Intelligence in Surgery</h3>
        <p>AI is transforming surgical planning, intraoperative decision-making, and post-operative care through advanced analytics and machine learning.</p>

        <h3>Advanced Imaging</h3>
        <p>New imaging technologies provide real-time visualization of anatomy and pathology, improving surgical accuracy and safety.</p>

        <h3>What This Means for Patients</h3>
        <p>These innovations lead to better outcomes, shorter recoveries, and expanded treatment options for complex conditions.</p>
      `,
      category: 'surgical-innovation',
      author: 'Dr. Thando Vilakazi',
      date: '2023-12-15',
      readTime: '8 min read',
      icon: '🤖'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const currentPost = blogPosts.find(post => post.id === postId);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (currentPost) {
    return (
      <div className={styles.blog}>
        <div className="container">
          <div className={styles.blogPost}>
            <div className={styles.blogPostHero}>
              <div className={styles.blogPostImage}>
                {currentPost.icon}
              </div>
              <h1 className={styles.blogPostTitle}>{currentPost.title}</h1>
              <div className={styles.blogPostMeta}>
                <span>By {currentPost.author}</span>
                <span>•</span>
                <span>{new Date(currentPost.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{currentPost.readTime}</span>
              </div>
            </div>

            <div
              className={styles.blogPostContent}
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />

            <div className={styles.blogPostActions}>
              <Link to="/blog" className={styles.backButton}>
                ← Back to Blog
              </Link>
              <div className={styles.socialShare}>
                <button className={styles.socialButton} title="Share on Facebook">
                  f
                </button>
                <button className={styles.socialButton} title="Share on Twitter">
                  𝕏
                </button>
                <button className={styles.socialButton} title="Share via Email">
                  ✉
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blog}>
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Medical Insights & Education</h1>
          <p className={styles.heroSubtitle}>
            Expert articles and tips to help you understand surgical care and make informed health decisions
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.blogControls}>
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search articles..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.categoryFilter}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id ? styles.active : ''
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.blogGrid}>
          {currentPosts.map(post => (
            <article key={post.id} className={styles.blogCard}>
              <Link to={`/blog/${post.id}`} className={styles.blogLink}>
                <div className={styles.blogImage}>
                  {post.icon}
                </div>
                <div className={styles.blogContent}>
                  <div className={styles.blogCategory}>
                    {categories.find(cat => cat.id === post.category)?.label}
                  </div>
                  <h2 className={styles.blogTitle}>{post.title}</h2>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  <div className={styles.blogMeta}>
                    <span className={styles.blogAuthor}>
                      👤 {post.author}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className={styles.blogReadMore}>
                    Read More →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span className={styles.paginationInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;