import { render } from '@testing-library/react';

export async function renderAsyncComponent(Component, props) {
  const ComponentResolved = await Component(props);
  return render(ComponentResolved);
}
