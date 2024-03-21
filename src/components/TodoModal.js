import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
// import { add } from 'date-fns';
import { addTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

function TodoModal({ modalOpen, setModalOpen }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    const modalContainer = document.getElementById('modalContainer');
    if (modalContainer) {
      modalContainer.scrollTop = modalContainer.scrollHeight;
    }
  }, [modalOpen]);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!title) {
      toast.error('Please enter a title for the task');
      return;
    }

    const newTodo = {
      id: uuid(),
      title,
      description,
      status,
    };

    dispatch(addTodo(newTodo));
    toast.success('Task Added Sucessfully');
    setTitle('');
    setDescription(' ');
    setStatus('incomplete');
    setModalOpen(false);
  };

  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container} id="modalContainer">
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleAddTask(e)}>
            <h1 className={styles.formTitle}>Add Task</h1>
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
            <label htmlFor="type">
              Status
              <select
                id="type"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Completed</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                Add Task
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
