import { useState } from "react";

const DropDown = ({ difficulty, handleDifficulty }) => {
  return (
    <>
      <label
        for="difficulty"
        class="mb-2 block text-sm font-medium text-gray-900 "
      >
        Select difficulty level
      </label>
      <select
        id="difficulty"
        value={difficulty}
        onChange={handleDifficulty}
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
      >
        <option selected>Choose difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </>
  );
};

export default DropDown;
