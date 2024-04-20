import { Component, Node } from './figma-ast.types'

export declare type StyleType = 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';

/** A set of properties that can be applied to nodes and published. Styles for a property can be created in the corresponding property's panel while editing a file */
export interface Style {
  /** The key of the style */
  key: string;
  /** The name of the style */
  name: string;
  /** The description of the style */
  description: string;
  /** The type of style */
  styleType: StyleType;
}

export interface BaseFile {
  key: string;
  name: string;
  thumbnail_url: string;
  last_modified: string;
}
export interface ProjectFile extends BaseFile {
  branches?: BaseFile[];
}

export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: Node<'DOCUMENT'>;
  components: {
    [nodeId: string]: Component;
  };
  schemaVersion: number;
  styles: {
    [styleName: string]: Style;
  };
  mainFileKey?: string;
  branches?: ProjectFile[];
}
