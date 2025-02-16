export interface NavigationEvent {
  sessionId: string;
  productId: number;
  entryTime: Date;
  exitTime?: Date;
  duration?: number;
  nextProductId?: number;
}

export interface ProductRelationship {
  sourceProductId: number;
  targetProductId: number;
  weight: number;
}
