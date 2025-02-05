import fs from 'fs';
import type { IUnleashConfig } from '../server-impl';
import { rewriteHTML } from './rewriteHTML';
import path from 'path';
import fetch from 'make-fetch-happen';

export async function loadIndexHTML(
  config: IUnleashConfig,
  publicFolder: string,
): Promise<string> {
  const { cdnPrefix, baseUriPath = '' } = config.server;
  const uiFlags = encodeURI(JSON.stringify(config.ui.flags || '{}'));

  let indexHTML: string;
  if (cdnPrefix) {
    const res = await fetch(`${cdnPrefix}/index.html`);
    indexHTML = await res.text();
  } else {
    const indexHtmlPath = path.join(config.publicFolder || publicFolder, 'index.html');

    indexHTML = fs
      .readFileSync(indexHtmlPath)
      .toString();
  }

  return rewriteHTML(indexHTML, baseUriPath, cdnPrefix, uiFlags);
}
