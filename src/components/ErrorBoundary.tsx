import React from 'react';
import { SEVEN_CONFIG } from '../config/seven';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08090B] text-[#F5F3EE] flex items-center justify-center p-6">
          <div className="max-w-sm w-full bg-[#151619] border border-white/10 rounded-2xl p-6 text-center space-y-4">
            <h1 className="text-lg font-bold tracking-tight">
              Seven Lounge &amp; Drinks
            </h1>
            <p className="text-xs text-[#B8BAC0]">
              Celina Park · Goiânia
            </p>
            <div className="space-y-2 pt-2">
              <a
                href={SEVEN_CONFIG.links.menu}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 rounded-xl bg-[#FF5A16] text-white text-sm font-bold"
              >
                Confira nosso cardápio
              </a>
              <a
                href={SEVEN_CONFIG.links.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 rounded-xl bg-white/10 text-[#F5F3EE] text-sm font-semibold"
              >
                Fale com a Seven
              </a>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="block w-full py-2 text-xs text-[#B8BAC0] underline"
              >
                Recarregar página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
