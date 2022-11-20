import type { Model } from "~/models/interface/Model";
import type {
  VisitorCountDimensions,
  VisitorCountSource,
} from "~/models/VisitorCountModel/types";
import type { Count, VisitorCount } from "~/apis/visitor";

// TODO: type 변경 필요
export class VisitorCountModel implements Model {
  source: VisitorCountSource[] = [];
  dimensions: VisitorCountDimensions[] = [];

  constructor(private visitorCount: Count & { date: VisitorCount["date"] }) {
    this.getDimensions();
    this.getSource();
  }

  private getDimensions() {
    Object.keys(this.visitorCount).forEach((key) => {
      const visitorCountKey = key as keyof (Count & {
        date: VisitorCount["date"];
      });

      if (visitorCountKey === "date") {
        this.dimensions.unshift(visitorCountKey);
        return;
      }

      this.dimensions.push(visitorCountKey);
    });
  }

  private getSource() {
    Array(this.visitorCount.date?.length || 0)
      .fill(0)
      .map((_, index) => {
        const result: VisitorCountSource = {} as VisitorCountSource;

        Object.keys(this.visitorCount).forEach((key) => {
          const visitorCountKey = key as keyof Count;

          // @ts-ignore
          result[visitorCountKey] = this.visitorCount[visitorCountKey]?.[index];
        });

        this.source.push(result);
      });
  }

  toJson() {
    return {
      source: this.source,
      dimensions: this.dimensions,
    };
  }
}
