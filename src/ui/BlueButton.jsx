
const BlueButton = ({
    onClickHandler,
    text
}) => {
  return (
    <button
        onClick={onClickHandler}
        className='px-4 py-2 text-white bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm'
    >
        {text}
    </button>
  )
}

export default BlueButton