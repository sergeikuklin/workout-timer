import { FC, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from './ChevronLeftIcon';
import { Button } from '@/components/ui/button';

type PageProps = {
  children: ReactNode;
  title: string;
};

export const Page: FC<PageProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <header className="grid grid-cols-[50px_1fr_50px] items-center bg-background border-b border-border mb-5">
        {location.key !== 'default' ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <ChevronLeftIcon />
          </Button>
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
