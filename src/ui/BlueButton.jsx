
const BlueButton = ({
  onClickHandler,
  text,
  disabled
}) => {
  
  return (
    <button
      onClick={onClickHandler}
      disabled={disabled}
      className='px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm transition-all'
    >
      {text}
    </button>
  )
}

export default BlueButton;