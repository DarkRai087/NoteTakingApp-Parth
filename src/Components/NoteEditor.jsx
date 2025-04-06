import { useState, useEffect } from 'react';

export default function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const isEditing = !!note;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    console.log('Saving note:', { id: note?.id, title, content });

    onSave({
      id: note?.id,
      title,
      content,
    });

    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-800 font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          placeholder="Enter the note title"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-800 font-semibold mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          placeholder="Write your note here..."
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          {isEditing ? 'Update Note' : 'Create Note'}
        </button>
      </div>
    </form>
  );
}