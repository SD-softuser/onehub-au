import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { tasks } from '../constants';

const RenderTasks = ({ tasks, checked, handleChange, handleChildChange }) => {
  return tasks.map((task, index) => {
    if (task.type === "single") {
      return (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={!!checked[task.label]}
              onChange={() => handleChange(task.label)}
            />
          }
          label={task.label}
        />
      );
    } else if (task.type === "multiple") {
      const allChecked = task.children.every(child => checked[child.label]);
      const someChecked = task.children.some(child => checked[child.label]);

      return (
        <div key={index}>
          <FormControlLabel
            label={task.label}
            control={
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked && !allChecked}
                onChange={() => handleChange(task.label, task.children)}
              />
            }
          />
          <div className='pl-4 flex flex-col'>
            {task.children.map((child, childIndex) => (
              <FormControlLabel
                key={childIndex}
                control={
                  <Checkbox
                    checked={!!checked[child.label]}
                    onChange={() => handleChildChange(child.label, task.label, task.children)}
                  />
                }
                label={child.label}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  });
};

const Structure = ({name}) => {
  const [checked, setChecked] = useState({});
  console.log(checked);

  const handleChange = (label, children = []) => {
    const newChecked = { ...checked };
    const isChecked = !newChecked[label];

    newChecked[label] = isChecked;
    if (children.length) {
      children.forEach(child => {
        newChecked[child.label] = isChecked;
      });
    }

    setChecked(newChecked);
  };

  const handleChildChange = (childLabel, parentLabel, children) => {
    const newChecked = { ...checked };
    newChecked[childLabel] = !newChecked[childLabel];

    const allChildrenChecked = children.every(child => newChecked[child.label]);
    newChecked[parentLabel] = allChildrenChecked;

    setChecked(newChecked);
  };

  return (
    <main className='bg-white w-full rounded-2xl shadow-lg'>
      <div className='py-4 px-4 relative'>
        <h1 className='text-4xl text-googleBlue-400'>
          Your Day at {name}
        </h1>
        <div className='absolute top-4 right-4 w-32 h-32 rounded-full border-[1px]'>
          <img src="/assets/Structure Vector.png" alt="" />
          <div className='absolute top-[10%] left-[-15%] w-10 p-2 bg-white rounded-full border-[1px]'>
            <img src="Google Logo.png" alt="" />
          </div>
        </div>
      </div>
      <div className='bg-[#F6F7FA] w-full h-[2px]' />

      <div className='px-6'>
        <FormGroup>
          <RenderTasks
            tasks={tasks}
            checked={checked}
            handleChange={handleChange}
            handleChildChange={handleChildChange}
          />
        </FormGroup>
      </div>

      <div className='w-full px-20 py-6'>
        <img src="/assets/TSM Toolbelt.png" alt="" />
      </div>
    </main>
  );
};

export default Structure;
