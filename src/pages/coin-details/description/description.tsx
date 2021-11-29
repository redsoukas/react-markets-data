import { ReactElement, useState } from 'react';
import styles from 'pages/coin-details/description/description.module.scss';

interface DescriptionProps {
  content: string;
}
export const Description = ({ content }: DescriptionProps): ReactElement => {
  const showButton = content?.length > 500;
  const [descriptionHidden, setDescriptionHidden] = useState(showButton);
  if (!content) return <></>;
  return (
    <div className={`${styles.description} ${descriptionHidden ? styles.hidden : ''}`}>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <div className={`${styles.readmore} ${descriptionHidden ? styles.readmoreHidden : ''}`}>
        {showButton && (
          <button
            onClick={() => {
              setDescriptionHidden(!descriptionHidden);
            }}
          >
            {descriptionHidden ? 'Read More' : 'Read Less'}
          </button>
        )}
      </div>
    </div>
  );
};
