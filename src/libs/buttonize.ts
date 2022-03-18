interface buttonizeProps {
  role: 'button';
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export default function buttonize(callback: () => void): buttonizeProps {
  return {
    role: 'button',
    onClick: callback,
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === '13' || event.key === '32') callback();
    },
  };
}
