import type { IChangeRequestAccessReadModel } from './change-request-access-read-model';

export class FakeChangeRequestAccessReadModel
  implements IChangeRequestAccessReadModel
{
  private readonly canBypass: boolean;
  private readonly isChangeRequestEnabled: boolean;

  constructor(canBypass = true, isChangeRequestEnabled = true) {
    this.canBypass = canBypass;
    this.isChangeRequestEnabled = isChangeRequestEnabled;
  }

  async canBypassChangeRequest(): Promise<boolean> {
    return this.canBypass;
  }

  async canBypassChangeRequestForProject(): Promise<boolean> {
    return this.canBypass;
  }

  async isChangeRequestsEnabled(): Promise<boolean> {
    return this.isChangeRequestEnabled;
  }

  async isChangeRequestsEnabledForProject(): Promise<boolean> {
    return this.isChangeRequestEnabled;
  }
}
