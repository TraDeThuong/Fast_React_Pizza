import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './UserSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch( )
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return
    dispatch(updateName(username))
    navigate("/menu")
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full mx-auto text-center space-y-5">
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 rounded-full bg-amber-100 
               focus:outline-none focus:ring-2 focus:ring-amber-400
               placeholder:text-amber-500 text-sm transition"
      />

      {username !== '' && (
        <div>
          <Button type = "primary"> STAR ODERING </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
