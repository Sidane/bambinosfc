# Bambinos FC

## Setup

Player data will be generated via the seeds file.

Import matches:

    rails runner MatchImporter.import

Setup random goalscorers for the Bambinos matches:

    rake data:generate_goalscorers
