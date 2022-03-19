/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Input from '@/components/Form/Input';

interface InputSectionProps {
  inputIds: string[];
  fractions: ['hour', 'minute', 'second'];
  spanContents: ['h', 'm', 's'];
  inputSectionName: string;
  nextNode?: HTMLInputElement[] | undefined;
}

export default function InputSection({
  inputIds,
  fractions,
  spanContents,
  inputSectionName,
  nextNode,
}: InputSectionProps): JSX.Element {
  return (
    <section className="form-control w-full">
      <label htmlFor={inputIds[0]} className="label">
        <span className="font-semibold">{inputSectionName}</span>
      </label>
      <div className="grid grid-cols-3 gap-1">
        {inputIds.map((id, index) => (
          <Input
            key={id}
            id={id}
            fraction={fractions[index]}
            spanContent={spanContents[index]}
            nextNode={nextNode ? nextNode[index + 1] : undefined}
          />
        ))}
      </div>
    </section>
  );
}

InputSection.defaultProps = { nextNode: undefined };