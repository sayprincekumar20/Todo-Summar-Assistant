import React, { useState } from 'react';

function TodoList({ todos, onDelete, onToggleComplete, onEdit }) {
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const handleEdit = (todo) => {
    setEditTodoId(todo.id);
    setEditedTitle(todo.title);
    setEditedContent(todo.content || '');
  };

  const handleEditSubmit = (todo) => {
    if (typeof onEdit === 'function') {
      onEdit(todo.id, editedTitle.trim(), editedContent.trim());
    } else {
      console.error("onEdit is not a function");
    }
    setEditTodoId(null);
    setEditedTitle('');
    setEditedContent('');
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditedTitle('');
    setEditedContent('');
  };

  if (todos.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No todos yet! Add one to get started.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Done</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Content</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Created At</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {todos.map(todo => (
            <tr
              key={todo.id}
              className={`hover:bg-gray-50 transition ${
                todo.completed ? 'bg-green-50' : ''
              }`}
            >
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleComplete(todo.id)}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                />
              </td>

              <td className="px-4 py-3 whitespace-nowrap">
                {editTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={e => setEditedTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleEditSubmit(todo)}
                    className="w-full border-b-2 border-green-400 focus:outline-none focus:border-green-600 text-sm font-semibold"
                    placeholder="Edit title"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`text-sm font-semibold ${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </td>

              <td className="px-4 py-3 whitespace-normal max-w-xs">
                {editTodoId === todo.id ? (
                  <textarea
                    value={editedContent}
                    onChange={e => setEditedContent(e.target.value)}
                    placeholder="Edit content"
                    className="w-full p-1 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-800 text-sm"
                    rows={3}
                  />
                ) : (
                  <p
                    className={`text-sm text-gray-700 whitespace-pre-wrap ${
                      todo.completed ? 'line-through' : ''
                    }`}
                  >
                    {todo.content || <i className="text-gray-400">No details</i>}
                  </p>
                )}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                {new Date(todo.createdAt).toLocaleString()}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-center space-x-2">
                {editTodoId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleEditSubmit(todo)}
                      title="Save"
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      title="Cancel"
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition text-xs"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(todo)}
                      title="Edit"
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(todo.id)}
                      title="Delete"
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
