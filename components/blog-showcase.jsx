import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    title: "The Future of AI in Web Development",
    snippet: "Exploring how artificial intelligence is shaping the landscape of web development and what it means for developers.",
    link: "/blog/ai-in-web-development",
    date: "2023-06-15"
  },
  {
    title: "Mastering React Hooks: A Comprehensive Guide",
    snippet: "A deep dive into React Hooks, covering everything from basic usage to advanced patterns and best practices.",
    link: "/blog/mastering-react-hooks",
    date: "2023-05-22"
  },
  {
    title: "Building Scalable APIs with GraphQL and Node.js",
    snippet: "Learn how to create efficient and flexible APIs using GraphQL and Node.js, with real-world examples and tips.",
    link: "/blog/graphql-nodejs-apis",
    date: "2023-04-10"
  },
  {
    title: "The Power of Server-Side Rendering in Next.js",
    snippet: "Discover how server-side rendering can improve your web application's performance and SEO.",
    link: "/blog/server-side-rendering-nextjs",
    date: "2023-03-05"
  }
]

const BlogShowcase = () => {
  return (
    <section id="blogs" className="py-20 bg-background">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>{blogPosts[0].title}</CardTitle>
            <CardDescription>{blogPosts[0].date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{blogPosts[0].snippet}</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={blogPosts[0].link}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
        {blogPosts.slice(1, 4).map((post, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.snippet}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href={post.link}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default BlogShowcase

