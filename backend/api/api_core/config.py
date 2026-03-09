from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    bucket: str

    aggregated_data_prefix: str = "aggregated_data"
    profile: str = "default"
    region: str = "us-east-1"
    logging_level: str = "INFO"
    allowed_origins: str = "https://github-tech-trends.vercel.app,http://localhost:3000"
    api_prefix: str = ""


    def get_repo_list_path(self):
        return f"{self.aggregated_data_prefix}/repo_list/repo_list.json"

    def get_repo_comparison_path(self, interval):
        return f"{self.aggregated_data_prefix}/repo_comparison/{interval}.json"

    def get_primary_languages_path(self, interval):
        return f"{self.aggregated_data_prefix}/primary_langs_counts/{interval}.json"
    
    def get_repo_counts_path(self, interval):
        return f"{self.aggregated_data_prefix}/repo_counts/{interval}.json"