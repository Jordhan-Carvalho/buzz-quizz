const loadingScreen = document.querySelector(".loading-screen") as HTMLElement;

export function firstLetterUpperCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isLoading() {
  loadingScreen.classList.toggle("display-none");
}
