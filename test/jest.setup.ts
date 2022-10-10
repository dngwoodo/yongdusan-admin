import { installGlobals } from "@remix-run/node";
import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import { mswServer } from "./mocks/mswServer";

// https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/
expect.extend(matchers);

installGlobals();

beforeAll(() => mswServer.listen());

afterEach(() => mswServer.resetHandlers());

afterAll(() => mswServer.close());
