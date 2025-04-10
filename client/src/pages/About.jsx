import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Imran's Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Imran's Blog! This blog was created by Shaik imran
              as a blog platform for user's to publish retail blogs help retail websites maintain fresh and engaging blog content.
              and share  thoughts and ideas with the world. 
              The platform features a React-based interface for easy content management and editing. 
              A Node.js backend supports saving and scheduling posts for automated publishingSahand is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog platform, you'll find weekly articles and tutorials on topics
              such as  covering product insights, shopping advice, and market trends, web development, software engineering, and programming
              languages. Imran is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>
            <p>
              Imran's Blog is a place for everyone, whether you're a beginner
              or an experienced developer. We believe that sharing knowledge
              and experiences is the best way to learn and grow.
              Imran encourages you to leave comments, ask questions, and share
              your own experiences with the community.
            </p>
            <p>
              If you have any questions or suggestions for future articles,
              please feel free to reach out to us. You can contact us through
              the contact form on our website or by sending us an email.
              We love hearing from our readers and appreciate your feedback!
            </p>
            <p>
              Thank you for visiting Imran's Blog! We hope you find our
              content helpful and inspiring. Don't forget to subscribe to our
              newsletter to stay updated on the latest articles and tutorials.
              You can also follow us on social media to join the conversation
              and connect with other readers.
            </p>
          </div>
        </div>
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}