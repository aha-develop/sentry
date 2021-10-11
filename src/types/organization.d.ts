declare interface IOrganization {
  id: string;
  slug: string;
  name: string;
  avatar?: AvatarType;
  dateCreated?: string;
  features?: string[];
  isEarlyAdopter?: boolean;
  require2FA?: boolean;
  requireEmailVerification?: boolean;
  status?: { id?: string; name?: string };
}
