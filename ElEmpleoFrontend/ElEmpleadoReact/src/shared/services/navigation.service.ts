class NavigationService {
  private navigateFunction: ((path: string) => void) | null = null;
  setNavigate(navigate: (path: string) => void) {
    this.navigateFunction = navigate;
  }

  navigate(path: string) {
    if (this.navigateFunction) {
      this.navigateFunction(path);
    } else {
      // Fallback a window.location si navigate no está disponible
      window.location.href = path;
    }
  }
}

// Instancia singleton del servicio
export const navigationService = new NavigationService();
