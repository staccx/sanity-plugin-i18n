import { isTypeMaskEnabled } from "./utils";
import { TypeMask } from "./i18nConfig";

describe("Utils", () => {
  describe("isTypeMaskEnabled", function () {
    test("all masks enabled", function () {
      const all = TypeMask.All;
      expect(isTypeMaskEnabled(all, TypeMask.String)).toBe(true);
      expect(isTypeMaskEnabled(all, TypeMask.Text)).toBe(true);
      expect(isTypeMaskEnabled(all, TypeMask.RichText)).toBe(true);
    });
    test("string", function () {
      const string = TypeMask.String;
      expect(isTypeMaskEnabled(string, TypeMask.String)).toBe(true);
      expect(isTypeMaskEnabled(string, TypeMask.Text)).toBe(false);
      expect(isTypeMaskEnabled(string, TypeMask.RichText)).toBe(false);
    });
    test("text", function () {
      const string = TypeMask.Text;
      expect(isTypeMaskEnabled(string, TypeMask.String)).toBe(false);
      expect(isTypeMaskEnabled(string, TypeMask.Text)).toBe(true);
      expect(isTypeMaskEnabled(string, TypeMask.RichText)).toBe(false);
    });
    test("rich text", function () {
      const string = TypeMask.RichText;
      expect(isTypeMaskEnabled(string, TypeMask.String)).toBe(false);
      expect(isTypeMaskEnabled(string, TypeMask.Text)).toBe(false);
      expect(isTypeMaskEnabled(string, TypeMask.RichText)).toBe(true);
    });
    test("none", function () {
      const string = TypeMask.None;
      expect(isTypeMaskEnabled(string, TypeMask.String)).toBe(false);
      expect(isTypeMaskEnabled(string, TypeMask.Text)).toBe(false);
      expect(isTypeMaskEnabled(string, TypeMask.RichText)).toBe(false);
    });
    test("string | text", function () {
      const string = TypeMask.String | TypeMask.Text;
      expect(isTypeMaskEnabled(string, TypeMask.String)).toBe(true);
      expect(isTypeMaskEnabled(string, TypeMask.Text)).toBe(true);
      expect(isTypeMaskEnabled(string, TypeMask.RichText)).toBe(false);
    });
    test("string | rich text", function () {
      const string = TypeMask.String | TypeMask.RichText;
      expect(isTypeMaskEnabled(string, TypeMask.String)).toBe(true);
      expect(isTypeMaskEnabled(string, TypeMask.Text)).toBe(false);
      expect(isTypeMaskEnabled(string, TypeMask.RichText)).toBe(true);
    });

    test("text | rich text", function () {
      const string = TypeMask.Text | TypeMask.RichText;
      expect(isTypeMaskEnabled(string, TypeMask.String)).toBe(false);
      expect(isTypeMaskEnabled(string, TypeMask.Text)).toBe(true);
      expect(isTypeMaskEnabled(string, TypeMask.RichText)).toBe(true);
    });
  });
});
