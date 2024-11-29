"""This module contains the CSVVisualizer class."""

import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import numpy as np

matplotlib.use('Agg')

class CSVVisualizer:
    """This class is responsible for parsing the csv and generating visualizations from that csv.

    The class contains the following data members:
        +file_path - a string containg the path to the csv file
        +df - a data structure that stores the csv data for easier manipulation
        +columns = a list of all the column heading in the csv
        +x_col, y_col - the specific columns that are being tracked for the particular chart
        +chart_type - a string that specifies the type of chart being generated
        +color - a string that specifies the color used for the visualization
        +x_label, y_label - strings representing the axis titles
        +title, legend - strings that contain meta-information about the chart
        +include_line_of_best_fit - a boolean that represents whether or not a line of best fit 
        should be generated for the scatter plot chart

    In addition to these data members, there are methods that set each of the specified 
    data members, a method to glean statistical data from the csv, and a method that 
    actually generates the chart 
    """
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
            self.x_label = x_col
            self.y_col = y_col if y_col in self.columns else None
        else:
            raise ValueError("Selected columns not found in CSV")
        return self  # Enable method chaining

    def set_chart_type(self, chart_type):
        """Set the type of chart."""
        valid_chart_types = ['scatter', 'plot', 'bar', 'histogram', 'box']
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
        """Get the columns from the csv."""
        return self.columns

    def add_line_of_best_fit(self, include=True):
        """Enable or disable line of best fit for scatter plots."""
        self.include_line_of_best_fit = include and self.chart_type == "scatter"
        return self

    def calculate_statistics(self):
        """Calculate and return statistics for the X and Y columns."""
        if not self.x_col:
            raise ValueError("X column is not selected.")
        stats = {
            "X Statistics": self.df[self.x_col].describe().to_dict()
        }

        if self.y_col:
            stats["Y Statistics"] = self.df[self.y_col].describe().to_dict()
        return stats

    def calculate_basic_statistics(self):
        """Calculate and return basic statistics 
        (count, mean, median, and range) for the X and Y columns.
        """
        if not self.x_col:
            raise ValueError("X column is not selected.")
        stats = {
            "X Statistics": {
                "count": self.df[self.x_col].count(),
                "mean": self.df[self.x_col].mean(),
                "median": self.df[self.x_col].median(),
                "range": self.df[self.x_col].max() - self.df[self.x_col].min()
            }
        }

        if self.y_col:
            stats["Y Statistics"] = {
                "count": self.df[self.y_col].count(),
                "mean": self.df[self.y_col].mean(),
                "median": self.df[self.y_col].median(),
                "range": self.df[self.y_col].max() - self.df[self.y_col].min()
            }
        return stats

    def plot(self):
        """Generate the plot based on the specified parameters and save it to disk"""
        plt.figure(figsize=(8, 6))

        if self.chart_type == "scatter":
            plt.scatter(self.df[self.x_col], self.df[self.y_col],
            color=self.color, alpha=0.7, label=self.legend)
            if self.include_line_of_best_fit:
                m, b = np.polyfit(self.df[self.x_col], self.df[self.y_col], 1)
                plt.plot(self.df[self.x_col], m * self.df[self.x_col] + b,
                color='red', linestyle='--', label='Line of Best Fit')

        elif self.chart_type == "bar":
            plt.bar(self.df[self.x_col], self.df[self.y_col], color=self.color, label=self.legend)

        elif self.chart_type == "histogram":
            plt.hist(self.df[self.x_col], bins=30, color=self.color, alpha=0.7, label=self.legend)

        elif self.chart_type == "box":
            plt.boxplot(self.df[self.x_col], patch_artist=True, boxprops={"facecolor": self.color})
            plt.xticks([1], [self.x_col])

        elif self.chart_type == "pie":
            data_counts = self.df[self.x_col].value_counts()
            plt.pie(data_counts, labels=data_counts.index, colors=[self.color], autopct='%1.1f%%')

        plt.xlabel(self.x_label)
        plt.ylabel(self.y_label)
        plt.title(self.title)
        plt.legend()
        plt.show()


    def preview(self, rows=5):
        """Display a preview of the data."""
        print(self.df.head(rows))
        return self
