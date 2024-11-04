import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns  # Seaborn for heatmap

class CSVVisualizer:
    def __init__(self, file_path):
        self.file_path = file_path
        self.df = pd.read_csv(file_path)  # Load CSV directly on initialization
        self.columns = self.df.columns.tolist()  # Store columns
        self.x_col = None
        self.y_col = None
        self.chart_type = 'scatter'
        self.color = 'blue'
        self.x_label = ''
        self.y_label = ''
        self.title = ''
        self.legend = ''
        self.include_line_of_best_fit = False

    def select_columns(self, x_col, y_col=None):
        """Set X and Y columns for plotting."""
        if x_col in self.columns:
            self.x_col = x_col
            self.y_col = y_col if y_col in self.columns else None
        else:
            raise ValueError("Selected columns not found in CSV")
        return self  # Enable method chaining

    def set_chart_type(self, chart_type):
        """Set the type of chart."""
        valid_chart_types = ['scatter', 'line', 'bar', 'histogram', 'box', 'pie', 'heatmap']
        if chart_type in valid_chart_types:
            self.chart_type = chart_type
        else:
            raise ValueError(f"Invalid chart type. Choose from: {', '.join(valid_chart_types)}")
        return self

    def set_color(self, color):
        """Set the color of the chart."""
        self.color = color
        return self

    def set_labels(self, x_label, y_label, title, legend):
        """Set labels, title, and legend for the chart."""
        self.x_label = x_label
        self.y_label = y_label
        self.title = title
        self.legend = legend
        return self

    def get_columns(self):
        return self.columns

    def add_line_of_best_fit(self, include=True):
        """Enable or disable line of best fit for scatter plots."""
        self.include_line_of_best_fit = include and self.chart_type == "scatter"
        return self

    def plot(self):
        """Generate the plot based on current configuration."""
        if self.chart_type != "pie" and (not self.x_col or not self.y_col):
            raise ValueError("X and Y columns must be set before plotting.")
        if self.chart_type == "pie" and not self.x_col:
            raise ValueError("Only one column is needed for pie chart.")

        plt.figure(figsize=(8, 6))

        if self.chart_type == "scatter":
            plt.scatter(self.df[self.x_col], self.df[self.y_col], color=self.color, alpha=0.5, label=self.legend)
            if self.include_line_of_best_fit:
                m, b = np.polyfit(self.df[self.x_col], self.df[self.y_col], 1)
                plt.plot(self.df[self.x_col], m * self.df[self.x_col] + b, color='red', linestyle='--', label='Line of Best Fit')

        elif self.chart_type == "line":
            sorted_df = self.df.sort_values(by=self.x_col)
            plt.plot(sorted_df[self.x_col], sorted_df[self.y_col], color=self.color, label=self.legend)

        elif self.chart_type == "bar":
            plt.bar(self.df[self.x_col], self.df[self.y_col], color=self.color, label=self.legend)

        elif self.chart_type == "histogram":
            plt.hist(self.df[self.y_col], bins=30, color=self.color, alpha=0.7, label=self.legend)

        elif self.chart_type == "box":
            plt.boxplot(self.df[self.y_col], patch_artist=True, boxprops=dict(facecolor=self.color))
            plt.xticks([1], [self.y_col])

        elif self.chart_type == "pie":
            data_counts = self.df[self.x_col].value_counts()
            plt.pie(data_counts, labels=data_counts.index, colors=plt.cm.Paired.colors, autopct='%1.1f%%')

        elif self.chart_type == "heatmap":
            if not np.issubdtype(self.df[self.x_col].dtype, np.number):
                raise ValueError("Heatmap requires numeric columns.")
            corr = self.df.corr()
            sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f")
        
        plt.xlabel(self.x_label)
        plt.ylabel(self.y_label)
        plt.title(self.title)
        plt.legend()
        plt.show()

    def preview(self, rows=5):
        """Display a preview of the data."""
        print(self.df.head(rows))
        return self
