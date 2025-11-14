# Database Schema

## survey_responses Table

Stores all annual survey responses from users.

### Fields

- `id` (UUID, Primary Key) - Auto-generated unique identifier
- `name` (TEXT, Required) - User's name
- `email` (TEXT, Required) - User's email address
- `role` (TEXT, Required) - One of: 'clinician', 'patient', 'industry', 'other'
- `familiarity_score` (INTEGER) - Score 1-7 for VLN familiarity
- `brand_reflection_score` (INTEGER) - Score 1-7 for brand reflection
- `communication_score` (INTEGER) - Score 1-7 for communication effectiveness
- `trustworthiness` (TEXT) - One of: 'very_low', 'low', 'moderate', 'high', 'very_high'
- `premier_resource` (BOOLEAN) - Whether user considers VLN premier resource
- `unbiased_source` (BOOLEAN) - Whether user considers VLN unbiased
- `community_factors` (TEXT[]) - Array of factors influencing community join decision
- `refer_others` (BOOLEAN) - Whether user refers others to VLN
- `ease_of_use_score` (INTEGER) - Score 1-5 for ease of finding resources
- `improvements_text` (TEXT) - Free text for improvements
- `valuable_resources` (TEXT[]) - Array of valuable resource types
- `testimonial` (TEXT, Required) - User testimonial (required for gift card entry)
- `may_contact` (BOOLEAN, Required) - Permission to contact user
- `submitted_at` (TIMESTAMP) - Auto-set submission timestamp

### Indexes

- `idx_survey_responses_submitted_at` - For sorting by submission date
- `idx_survey_responses_email` - For email lookups

