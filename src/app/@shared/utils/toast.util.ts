export interface ToastOptions {
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

const defaultOptions: Partial<ToastOptions> = {
  duration: 2000,
  type: 'info',
  position: 'top-right',
};

export const showToast: (options: ToastOptions) => void = (
  options: ToastOptions
): void => {
  const { message, duration, type, position } = {
    ...defaultOptions,
    ...options,
  };

  const toast: HTMLDivElement = document.createElement('div');
  toast.className = 'toast show';
  toast.style.position = 'fixed';
  toast.style.zIndex = '1000';
  toast.style.padding = '1rem';
  toast.style.borderRadius = '4px';
  toast.style.color = 'white';
  toast.textContent = message;

  // Set background color based on type
  switch (type) {
    case 'success':
      toast.style.backgroundColor = '#28a745';
      break;
    case 'error':
      toast.style.backgroundColor = '#dc3545';
      break;
    case 'warning':
      toast.style.backgroundColor = '#ffc107';
      toast.style.color = '#212529';
      break;
    case 'info':
    default:
      toast.style.backgroundColor = '#17a2b8';
      break;
  }

  switch (position) {
    case 'top-left':
      toast.style.top = '20px';
      toast.style.left = '20px';
      break;
    case 'bottom-right':
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      break;
    case 'bottom-left':
      toast.style.bottom = '20px';
      toast.style.left = '20px';
      break;
    case 'top-center':
      toast.style.top = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      break;
    case 'bottom-center':
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      break;
    case 'top-right':
    default:
      toast.style.top = '20px';
      toast.style.right = '20px';
      break;
  }

  document.body.appendChild(toast);

  setTimeout((): void => {
    toast.remove();
  }, duration);
};
