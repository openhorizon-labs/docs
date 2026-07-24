import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { BtnLink, DocsHero, HubCard, HubGrid } from './hub';
import { Eyebrow } from './ui-bits';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    BtnLink,
    DocsHero,
    Eyebrow,
    HubCard,
    HubGrid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
