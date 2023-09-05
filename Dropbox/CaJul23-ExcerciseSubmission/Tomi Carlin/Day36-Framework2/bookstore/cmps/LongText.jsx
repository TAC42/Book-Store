const { useState } = React

export function LongText({ text, length }) {
  const [isTruncated, setIsTruncated] = useState(true)

  if (!text || typeof text !== 'string') {
    return <p>Invalid text</p>
  }
 
  const words = text.split(' ')

  if (words.length <= length) {
    return <p>{text}</p>
  }

  const truncatedText = isTruncated ? words.slice(0, length).join(' ') : text

  const toggleReadMore = () => {
    setIsTruncated(!isTruncated)
  }

  return (
    <div className="long-text">
      <p>{truncatedText}</p>
      <button onClick={toggleReadMore}>
        {isTruncated ? 'Read more...' : 'Show less'}
      </button>
    </div>
  )
}