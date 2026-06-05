import type { ComponentProps, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { PORTAL_URL } from '@/config/portal';

type PortalButtonProps = Omit<ComponentProps<typeof Button>, 'asChild'> & {
  children: ReactNode;
};

export function PortalButton({ children, ...props }: PortalButtonProps) {
  return (
    <Button asChild {...props}>
      <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">{children}</a>
    </Button>
  );
}
