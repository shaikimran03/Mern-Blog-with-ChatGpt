import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex border border-teal-500 p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
          Want to publish your first Retail blog? follow these steps
        </h2>
        <p className='text-gray-500 my-2'>
          Check out how to write Retail blogs 
        </p>
        <a
          href='https://smartblogger.com/how-to-write-a-blog-post/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            gradientDuoTone='purpleToPink'
            className='rounded-tl-xl rounded-bl-none rounded-br-xl w-full'
          >
            How?
          </Button>
        </a>
      </div>
      <div className='flex-1 p-7'>
        <img src='https://www.tecligster.com/wp-content/uploads/2022/11/How-to-5.jpg' />
      </div>
    </div>
  );
}
