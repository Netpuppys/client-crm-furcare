
const BlueButton = ({
    onClickHandler,
    text,
    disabled
}) => {
  return (
    <button
        onClick={onClickHandler}
        disabled={disabled}
        className='px-4 py-2 disabled:bg-[#E1E3EA] text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm'
    >
        {text}
    </button>
  )
}

export default BlueButton