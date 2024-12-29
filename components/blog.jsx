import Link from 'next/link'

const blogPosts = [
  {
    title: "The Future of AI in Web Development",
    snippet: "Exploring how artificial intelligence is shaping the landscape of web development and what it means for developers.",
    link: "/blog/ai-in-web-development"
  },
  {
    title: "Mastering React Hooks: A Comprehensive Guide",
    snippet: "A deep dive into React Hooks, covering everything from basic usage to advanced patterns and best practices.",
    link: "/blog/mastering-react-hooks"
  },
  {
    title: "Building Scalable APIs with GraphQL and Node.js",
    snippet: "Learn how to create efficient and flexible APIs using GraphQL and Node.js, with real-world examples and tips.",
    link: "/blog/graphql-nodejs-apis"
  }
]

const Blog = () => {
  return (
    <section id="blogs" className="py-20 bg-secondary">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Latest Blog Posts</h2>
      <div className="max-w-3xl mx-auto">
        {blogPosts.map((post, index) => (
          <div key={index} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.snippet}</p>
            <Link href={post.link} className="text-accent hover:text-accent/90 transition-colors">
              Read More &rarr;
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/blog" className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full text-lg transition-colors">
          View All Posts
        </Link>
      </div>
    </section>
  )
}

export default Blog

