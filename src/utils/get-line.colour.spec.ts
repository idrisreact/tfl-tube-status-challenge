import { getLineColor } from "./get-line-colour";
import { describe,it,expect } from "vitest";



describe("getLineColor",()=>{

    const lineColorTests = [
        { line: "bakerloo", expected: "border-l-amber-600" },
        { line: "central", expected: "border-l-red-500" },
        { line: "northern", expected: "border-l-black" },
        { line: "piccadilly", expected: "border-l-blue-800" },

      ];

      lineColorTests.forEach(({ line, expected }) => {
        it(`should return ${expected} for ${line} line`, () => {
          expect(getLineColor(line)).toBe(expected);
        });
      });

      it("should handle case sensitivity", () => {
        expect(getLineColor("BAKERLOO")).toBe("border-l-gray-400");
      });
    
      it("should handle null/undefined gracefully", () => {
        expect(getLineColor(null as any)).toBe("border-l-gray-400");
        expect(getLineColor(undefined as any)).toBe("border-l-gray-400");
      });
   
})