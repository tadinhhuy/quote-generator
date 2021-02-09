import { useState, useEffect, useRef } from 'react';
import QuoteItem from '../../components/Quote/item';
import './style.scss';
import { getAllQuotes } from '../../services/quotes';

const QuoteGenerator: React.FC = () => {
  const [quotesList, setQuotesList] = useState<object[]>([]);

  const [color, setColor] = useState<string>('');

  const [text, setText] = useState<string>('');

  const [author, setAuthor] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const quoteItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleCallApi();
  }, []);

  useEffect(() => {
    handleRandomQuote();
  }, [quotesList]);

  const getRandomColor = (): string => {
    const LETTERS = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += LETTERS[~~(Math.random() * LETTERS.length)];
    }
    return color;
  };

  const getRandomQuote = (): number => {
    return ~~(Math.random() * quotesList.length);
  };

  const handleCallApi = async () => {
    try {
      const res: any = await getAllQuotes();
      setQuotesList(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomQuote = (): void => {
    const newColor: string = getRandomColor();
    const indexQuote: number = getRandomQuote();

    const quoteObj: any = quotesList[indexQuote];

    setText(quoteObj?.quote);
    setAuthor(quoteObj?.author);
    setColor(newColor);
  };

  return (
    <>
      <div style={{ backgroundColor: color }} className="quotes__container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <QuoteItem
            author={author}
            getNewQuote={handleRandomQuote}
            color={color}
            text={text}
            quoteItemRef={quoteItemRef}
          />
        )}
      </div>
    </>
  );
};

export default QuoteGenerator;
