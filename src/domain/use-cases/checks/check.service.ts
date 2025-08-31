interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      console.log(`Successfully fetched ${url}`);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
