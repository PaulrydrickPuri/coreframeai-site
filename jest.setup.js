// jest.setup.js
import '@testing-library/jest-dom';

// Mock window.matchMedia which is not available in Jest environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock for react-flow-renderer
jest.mock('reactflow', () => ({
  ...jest.requireActual('reactflow'),
  ReactFlowProvider: ({ children }) => children,
  useNodesState: () => [[], jest.fn(), jest.fn()],
  useEdgesState: () => [[], jest.fn(), jest.fn()],
  Background: () => null,
  Controls: () => null,
  Handle: () => null,
  Panel: ({ children }) => children,
}));
