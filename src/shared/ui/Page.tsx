import { FC, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from './ChevronLeftIcon';

type PageProps = {
  children: ReactNode;
  title: string;
};

export const Page: FC<PageProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <header className="grid grid-cols-[50px_1fr_50px] items-center bg-white border-b-2 mb-5">
        {location.key !== 'default' ? (
          <button
            className="btn btn-circle btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <ChevronLeftIcon />
          </button>
        ) : (
          <div />
        )}

        <div className="container mx-auto p-4 text-center">
          <h1>{title}</h1>
        </div>
      </header>
      <main className="container mx-auto px-4">
        <>{children}</>
      </main>
    </>
  );
};
