import { cleanup, screen } from "@testing-library/react";
import Home from "../../src/pages/Home/home";
import React from "react";

import "@testing-library/jest-dom/extend-expect"; // ???

// Использование нашей собственной функции рендеринга, а не рендеринга RTL, чтобы избежать ошибок с состоянием
import { renderWithProviders } from "../../jest/utils/testUtils";

// Note: запуск очистки afterEach выполняется автоматически в @testing-library/react@9.0.0 или выше,
// размонтируя и очищая DOM после завершения теста.
afterEach(cleanup);

it("Home page shows the text", () => {
  renderWithProviders(<Home />);
  expect(screen.getByText<HTMLHeadingElement>("Home page")).toBeInTheDocument();
});
