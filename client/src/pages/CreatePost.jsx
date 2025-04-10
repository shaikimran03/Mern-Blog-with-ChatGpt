// ... existing imports
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { SiOpenai } from 'react-icons/si';


export default function CreatePost() {
  // ... existing useStates
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerateBlog = async () => {
    if (!topic) return;
    setGenerating(true);
    try {
      const res = await axios.post('/api/generate-blog', { topic });
      const { title, content } = res.data;
      setFormData({ ...formData, title, content });
    } catch (err) {
      console.error('Failed to generate blog:', err);
    } finally {
      setGenerating(false);
    }
  };

  // ... your handleUploadImage and handleSubmit functions

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>

      {/* AI Blog Generation */}
      <div className='flex gap-2 mb-4'>
        <TextInput
          placeholder='Enter a topic like shopping, tech, etc.'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button
          type='button'
          onClick={handleGenerateBlog}
          gradientDuoTone='greenToBlue'
          disabled={generating}
        >
          <SiOpenai className='mr-2 text-lg' />
          {generating ? 'Generating...' : 'Generate with ChatGPT'}
        </Button>
      </div>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Title & Category */}
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            value={formData.title || ''}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>

        {/* Image Upload */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        {/* Editor */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          value={formData.content || ''}
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
        />

        {/* Publish */}
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>

        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}

