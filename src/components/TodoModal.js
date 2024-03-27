import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Please enter a title for the task');
      return;
    }

    const newTodo = {
      id: todo ? todo.id : uuid(),
      title,
      description, // Include description in newTodo object
      status,
    };

    if (type === 'add') {
      dispatch(addTodo(newTodo));
      toast.success('Task Added Successfully');
    } else if (type === 'update' && todo) {
      if (
        todo.title !== title ||
        todo.status !== status ||
        todo.description !== description
      ) {
        dispatch(updateTodo({ ...todo, ...newTodo }));
        toast.success('Task Updated Successfully');
      } else {
        toast.error('No changes made');
        return;
      }
    }
    setTitle('');
    setDescription('');
    setStatus('incomplete');
    setModalOpen(false);
  };

  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.formTitle}>
              {type === 'add' ? 'Add Task' : 'Update Task'}{' '}
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="description">
              Description (Optional)
              <textarea
                className={styles.formDescription}
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Completed</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                {type === 'add' ? 'Add Task' : 'Update Task'}{' '}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModal;
