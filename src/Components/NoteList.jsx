import { useState } from 'react';
import NoteCard from './NoteCard';
import NoteEditor from './NoteEditor';

export default function NoteList() {
  const [notes, setNotes] = useState([]); // Local state for notes
  const [editingNote, setEditingNote] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleSaveNote = (noteData) => {
    if (noteData.id) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteData.id ? { ...note, ...noteData, updated_at: new Date().toISOString() } : note
        )
      );
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(), // Generate a unique ID
        title: noteData.title,
        content: noteData.content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }

    setEditingNote(null);
    setShowEditor(false);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleDeleteNote = (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setShowEditor(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Notes</h2>
        {!showEditor && (
          <button
            onClick={handleNewNote}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            New Note
          </button>
        )}
      </div>

      {showEditor && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={handleCancelEdit}
        />
      )}

      {notes.length === 0 && !showEditor ? (
        <div className="text-center py-10">
          <p className="text-gray-600">You don't have any notes yet. Create one!</p>
          <button
            onClick={handleNewNote}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create Your First Note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}